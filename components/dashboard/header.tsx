import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { PdfUploadDialog } from "@/components/pdf-upload-dialog";

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-600">Welcome back, Admin</p>
      </div>
      <div className="flex items-center gap-4">
        <PdfUploadDialog />
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </div>
  );
};