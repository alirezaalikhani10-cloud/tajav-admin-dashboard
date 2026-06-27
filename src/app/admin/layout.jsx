import Header from "@/components/admin/Header";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Sidebar from "@/components/admin/Sidebar";

// export const metadata = {
//   title: {
//     template: "%s / Tajav Admin Dashboard",
//     default: "admin / Tajav Admin Dashboard",
//   },
// };

export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
