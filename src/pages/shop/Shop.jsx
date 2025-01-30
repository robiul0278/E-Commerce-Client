import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Pagination from '../../components/pagination';
import axios from 'axios';
import Loading from '../Loading';
import NotFound from '../products/NotFound';
import Filtering from '../../components/query/Filtering';
import ProductsCard from '../products/ProductsCard';
const { Header, Sider, Content } = Layout;
const Shop = () => {
    const [products, setProducts] = useState([]);
    console.log(products);
    // loading 
    const [loading, setLoading] = useState(false);
    // query 
    const [sort, setSort] = useState("");
    // filtering
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    // set update Query 
    const [filterBrand, setFilterBrand] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    // pagination 
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        const fetch = async () => {
            axios.get(`https://gadget-shop-server-bay.vercel.app/all-product?page=${page}&limit=${12}&sort=${sort}&brand=${brand}&category=${category}`)
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
    }, [brand, sort, category, page]);

    const handleReset = () => {
        setBrand("");
        setCategory("");
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
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} style={{ padding: 10 }} width={300} theme='light' collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Filtering
                    setSort={setSort}
                    setBrand={setBrand}
                    setCategory={setCategory}
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
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
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
                            <Loading />
                        ) : (
                            <>
                                {products.length === 0 ? (
                                    <NotFound />
                                ) : (
                                    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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