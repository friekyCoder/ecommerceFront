import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({ featuredproduct, newProducts }) {
  console.log({ newProducts });
  return (
    <div>
      <Header />
      <Featured product={featuredproduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "6544a41f3165052d06ae1149";
  await mongooseConnect();
  const featuredproduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredproduct: JSON.parse(JSON.stringify(featuredproduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
