import React from "react";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        User List
      </h1>
      <UserList />
    </div>
  );
}

export default App;
