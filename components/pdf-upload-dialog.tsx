"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PdfUploadDialog() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      toast({
        title: "PDF Processed Successfully",
        description: `Generated ${data.tasks.length} tasks from the document.`,
      });

      // Here you can handle the generated tasks (e.g., update global state, redirect to tasks page)

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Add Project
          <Upload className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Project Document</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`
            mt-4 p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
            transition-colors duration-200 ease-in-out
            ${isDragActive ? "border-sky-500 bg-sky-50" : "border-gray-300"}
            ${isUploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
              <p className="text-sm text-gray-600">Processing PDF...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive
                  ? "Drop the PDF here"
                  : "Drag & drop a PDF here, or click to select"}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}