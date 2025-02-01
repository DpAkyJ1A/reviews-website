import { getPage } from "@/actions/page";
import Home from "@/pages/Home/index.server";

export default async function index() {
  const page = await getPage('home');

  return (
    <>
      <Home page={page}/>
    </>
  );
}
