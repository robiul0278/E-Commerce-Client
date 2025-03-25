import { Layout, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Loading from '../Loading';
import NotFound from '../products/NotFound';
import Filtering from '../../components/query/Filtering';
import ProductsCard from '../products/ProductsCard';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination';
import { useState } from 'react';
import { useGetProductsQuery } from '../../redux/api/api';
const { Header, Sider, Content } = Layout;
const Shop = () => {
    const [sort, setSort] = useState("");
    // const [brand, setBrand] = useState("");
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(15);

    const {data: product, isLoading} = useGetProductsQuery({searchTerm, sort, limit, page})

    // const totalPage = [...Array(product?.data?.meta?.totalPage).keys()]
    const totalPage = [...Array(product?.data?.meta?.totalPage).keys()].map(i => i + 1);
    // ============== Ant =============================
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider className='hidden lg:flex md:flex' trigger={null} style={{ padding: 10 }} width={300} theme='light' collapsible >
                <div className="demo-logo-vertical" />
                <Filtering
                    product={product}
                    setSort={setSort}
                    // setBrand={setBrand}
                // setSubCategory={setSubCategory}
                // handleReset={handleReset}
                // filterBrand={filterBrand}
                // filterCategory={filterCategory}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                </Header>
                <Content

                    style={{
                        margin: '16px 16px 0px 16px',
                        // padding: 30,
                        minHeight: 280,
                        // background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div className="col-span-10">
                        {isLoading ? (
                            <div className='h-screen'>
                                <Loading />
                            </div>
                        ) : (
                            <>
                                {product?.data?.result.length === 0 ? (
                                    <NotFound />
                                ) : (
                                    <div className="min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  lg:gap-3 md:gap-3 gap-2 ">
                                        {product?.data?.result.map((product) => (
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
                    <Pagination setLimit={setLimit} setPage={setPage} page={page} totalPage={totalPage} limit={limit} />
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Shop;