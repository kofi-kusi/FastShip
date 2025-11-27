import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-6xl">Welcome to FastShip</h1>
      <p className="mt-2 text-2xl">Ship with us</p>
      <Button>
        <Link to="/seller/login">
          Seller Login
        </Link>
      </Button>
    </div>
  );
}
