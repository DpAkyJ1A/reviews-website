import type { Metadata } from "next";
import getGoodMetadata from "@/services/getGoodMetadata";

import { getGood } from "@/actions/good";
import Product from "@/pages/Product/index.server";

interface ProductPageProps {
  params: { label: string };
}

export default async function index({ params }: ProductPageProps) {
  const { label } = params;

  const good = await getGood(label);

  return (
    <Product good={good} />
  );
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const metadata = await getGoodMetadata({ label: params.label });
  return metadata as Metadata;
}
