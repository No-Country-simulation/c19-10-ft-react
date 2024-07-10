// pages/index.js

import NavBar from "../components/NavBar";

export default function Landing() {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold">Hello! This is Celebria App 😁</h1>
      </div>
    </div>
  );
}
