import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Pagination from '../../components/pagination';
import axios from 'axios';
import Loading from '../Loading';
import NotFound from '../products/NotFound';
import Filtering from '../../components/query/Filtering';
import ProductsCard from '../products/ProductsCard';
import { useSearchParams } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const Shop = () => {
    const [products, setProducts] = useState([]);
    // loading 
    const [loading, setLoading] = useState(false);
    // query 
    const [sort, setSort] = useState("");
    // filtering
    const [brand, setBrand] = useState("");
    const [subCategory, setSubCategory] = useState("");
    // set update Query 
    const [filterBrand, setFilterBrand] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    // pagination 
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    // Search Query 
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "";
    const subCategoryQuery = searchParams.get("sub-category") || "";

    useEffect(() => {
        if (subCategoryQuery) {
            setSubCategory(subCategoryQuery);
        }
    },[subCategoryQuery])

    useEffect(() => {
        if (subCategory === "" && subCategoryQuery !== "") return;
        setLoading(true);
        const fetch = async () => {
            axios.get(`https://gadget-shop-server-bay.vercel.app/all-product?page=${page}&limit=${12}&sort=${sort}&brand=${brand}&category=${categoryQuery}&sub_category=${subCategory}&search=${searchQuery}`)
                .then((res) => {
                    // console.log(res.data);
                    setProducts(res.data.products);
                    setFilterBrand(res.data.brands);
                    setFilterCategory(res.data.categories);
                    setTotalPage(Math.ceil(res.data.totalProducts / 9));
                    setLoading(false);
                })
        }
        fetch();
    }, [brand, sort,categoryQuery, subCategory,subCategoryQuery, page,searchQuery]);

    const handleReset = () => {
        setBrand("");
        setSubCategory("");
        setSort("");
        window.location.reload();
    }

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPage) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // ============== Ant =============================
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider className='hidden lg:flex md:flex' trigger={null} style={{ padding: 10 }} width={300} theme='light' collapsible >
                <div className="demo-logo-vertical" />
                <Filtering
                    setSort={setSort}
                    setBrand={setBrand}
                    setSubCategory={setSubCategory}
                    handleReset={handleReset}
                    filterBrand={filterBrand}
                    filterCategory={filterCategory}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {/* <Button
                    className='lg:flex md:flex hidden'
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    /> */}
                </Header>
                <Content
                
                    style={{
                        margin: '16px 16px 0px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div className="col-span-10">
                        {loading ? (
                            <div className='h-screen'>
                                <Loading />
                            </div>
                        ) : (
                            <>
                                {products.length === 0 ? (
                                    <NotFound />
                                ) : (
                                    <div className="min-h-screen grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                        {products.map((product) => (
                                            <ProductsCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        margin: '16px 16px 16px 16px',
                        padding: 5,
                    }}
                >
                    <Pagination handlePageChange={handlePageChange} page={page} totalPage={totalPage} />
                </Footer>

            </Layout>
        </Layout>
    );
};
export default Shop;