import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, History, Package, PackageOpen, BarChart2, Settings, ShoppingBag } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: Home, label: 'Inicio', href: '#' },
  { icon: History, label: 'Historia', href: '#' },
  { icon: Package, label: 'Productos', href: '#' },
  { icon: PackageOpen, label: 'Inventario', href: '#' },
  { icon: ShoppingBag, label: 'Pedidos', href: '#', active: true },
  { icon: BarChart2, label: 'Reportes', href: '#' },
  { icon: Settings, label: 'Configuración', href: '#' },
];

export default function Layout({ children }: LayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#E11D24] text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:bg-red-600">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#FFACAC] p-0 w-64">
                <SidebarContent mobile onClick={() => setIsMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <img src="https://cdn-icons-png.flaticon.com/512/1046/1046747.png" alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-xl">Barrio Chick'en</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Aquí podrías agregar más elementos del header, como un perfil de usuario */}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar para desktop */}
        <aside className="hidden lg:block w-64 bg-[#FFACAC] h-[calc(100vh-4rem)] sticky top-16">
          <SidebarContent />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

interface SidebarContentProps {
  mobile?: boolean;
  onClick?: () => void;
}

function SidebarContent({ mobile, onClick }: SidebarContentProps) {
  return (
    <div className="flex flex-col pt-4">
      {mobile && (
        <div className="px-6 py-4 flex items-center gap-2 border-b border-white/10 mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046747.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-black">Barrio Chick'en</span>
        </div>
      )}
      <nav className="space-y-1 px-2">
        {sidebarItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-black rounded-md transition-colors",
              item.active
                ? "bg-white/20 font-medium"
                : "hover:bg-white/10"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}