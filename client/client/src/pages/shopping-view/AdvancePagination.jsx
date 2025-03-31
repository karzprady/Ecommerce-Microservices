
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdvancedPagination({ totalPages,setCurrentPage,currentPage })  {
  
  

  // Create an array of pages to display
  const getPageRange = () => {
    const range = [];
    const maxPageVisible = 5; // Number of pages to display around current page
    const start = Math.max(1, currentPage - 2); // Start 2 pages before current page
    const end = Math.min(totalPages, currentPage + 2); // End 2 pages after current page

    // Add pages before and after the current range if necessary
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add ellipses if necessary
    if (start > 1) {
      range.unshift("...");
    }
    if (end < totalPages) {
      range.push("...");
    }

    return range;
  };

  const handlePageChange = (page) => {
    if (typeof page === "number") {
      setCurrentPage(page);
      // Clear the input when page is changed
    } else if (page === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (page === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 


  return (
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={() => handlePageChange("prev")}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {/* Page Buttons with Ellipses */}
      {getPageRange().map((page, index) => {
        if (page === "...") {
          return (
            <span key={index} className="text-gray-500">
              ...
            </span>
          );
        } else {
          return (
            <Button
              key={index}
              variant={currentPage === page ? "solid" : "outline"}
              className={currentPage === page ? "bg-fuchsia-200" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          );
        }
      })}

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => handlePageChange("next")}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>

      {/* Jump to Input Field */}
      
    </div>
  );
};

