import { ChartNoAxesCombined, Crown, LayoutDashboard, Truck, Volleyball, BriefcaseBusiness } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { SheetContent, SheetHeader, SheetTitle, Sheet } from "../sheet";

function Menus({setOpen}) {
  const nav = useNavigate();

  const MenuItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "features",
      label: "Features",
      path: "/admin/Features",
      icon: <Volleyball />,
    },
    {
      id: "Orders",
      label: "Orders",
      path: "/admin/Orders",
      icon: <Truck />,
    },
    {
      id: "Products",
      label: "Products",
      path: "/admin/products",
      icon: <BriefcaseBusiness />,
    },
  ];

  return (
    <nav className="mt-8 flex flex-col justify-center  gap-2">
      {MenuItems.map((menu) => (
        <Button
          key={menu.id}
          className="flex  gap-2 items-center rounded-md w-full"
          onClick={() =>{ setOpen(false) ; nav(menu.path)}}
        >
          {menu.icon}
          <span className="text-xl">{menu.label}</span>
        </Button>
      ))}
    </nav>
  );
}

export default function AdminSideBar({ open, setOpen }) {
  const nav = useNavigate();

  return (
    <Fragment>
      {/* Mobile View Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 top-0 left-0 h-full backdrop-blur-none text-fuchsia-500">
          <div className="flex flex-col items-center w-40 h-24">
            <SheetHeader className="border-b">
              <SheetTitle>
                <ChartNoAxesCombined size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <Menus setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop View Sidebar */}
      {open? <div className="ml-64"></div> :
    null}
    </Fragment>
  );
}
