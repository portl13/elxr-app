import Head from "next/head";
import { Col } from "reactstrap";
import CreateCommunityForm from "../components/community/CreateCommunityForm";
import Layout from "../components/layout/Layout";

export default function CreateCommunityPage() {
  return (
    <Layout>
      <Head>
        <title>PORTL</title>
      </Head>
      <Col xs="12">
        <h2 className="mb-3">Create a New Community</h2>
        <div className="mt-4 row">
          <CreateCommunityForm />
        </div>
      </Col>
    </Layout>
  );
}
