import Head from "next/head";
import Layout from "../../components/layout/Layout";
import ShopCard from "./ShopCard";

function ShopWrapper() {
  return (
    <Layout>
      <Head>
        <title>PORTL</title>
      </Head>
      <div className="item-body-content">
        <div className="products-panel">
          <ul>
            <ShopCard />
          </ul>
        </div>
      </div>
    </Layout>
  );
}
export default ShopWrapper;
