import type { Metadata } from "next";
import getPageMetadata from "@/services/getPageMetadata";

import { getPage } from "@/actions/page";
import Home from "@/pages/Home/index.server";

export default async function index() {
  const page = await getPage('home');

  return (
    <Home page={page}/>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata({ page: 'home' });
  return metadata as Metadata;
}
