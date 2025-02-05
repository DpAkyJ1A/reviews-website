import type { Metadata } from "next";
import getPageMetadata from "@/services/getPageMetadata";

import { getPage } from "@/actions/page";
import Contact from "@/pages/Contact/index.server";

export default async function index() {
  const page = await getPage('contact');

  return (
    <Contact page={page} />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata({ page: 'contact' });
  return metadata as Metadata;
}
