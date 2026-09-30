import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/config/axios';
import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  Palette,
  Server,
  Zap
} from 'lucide-react';


// Danh sách các thư viện đã cài đặt trong dự án
const installedTechs = [
  {
    name: 'React 19 + TypeScript',
    version: 'Latest',
    description: 'Thư viện UI cốt lõi kết hợp Type-checking an toàn',
    icon: Code2,
    badge: 'Core',
    color: 'text-sky-500',
  },
  {
    name: 'Vite',
    version: 'v6.x',
    description: 'Trình đóng gói & Server phát triển siêu nhanh',
    icon: Zap,
    badge: 'Bundler',
    color: 'text-amber-500',
  },
  {
    name: 'Tailwind CSS v4',
    version: 'v4.x',
    description: 'Framework Utility-First CSS cấu hình qua Vite plugin',
    icon: Palette,
    badge: 'Styling',
    color: 'text-teal-500',
  },
  {
    name: 'shadcn/ui',
    version: 'v4.x',
    description: 'Bộ Reusable Components thiết kế trên nền Radix UI',
    icon: Layers,
    badge: 'UI Library',
    color: 'text-indigo-500',
  },
  {
    name: 'TanStack Query',
    version: 'v5.x',
    description: 'Quản lý state, cache và bọc dữ liệu bất đồng bộ',
    icon: Globe,
    badge: 'State/Data',
    color: 'text-rose-500',
  },
  {
    name: 'Axios',
    version: 'v1.x',
    description: 'HTTP Client gửi yêu cầu REST API chuyên nghiệp',
    icon: Server,
    badge: 'HTTP Client',
    color: 'text-blue-500',
  },
];

export default function App() {
  // Test thử TanStack Query + Axios (Fetch thử dữ liệu giả lập từ JSONPlaceholder)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['healthCheck'],
    queryFn: async () => {
      const res = await apiFetch.get('https://jsonplaceholder.typicode.com/todos/1');
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-1 text-sm border-indigo-500/50 text-indigo-400 bg-indigo-500/10 rounded-full">
            ShipTrack Frontend Environment
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Hello World! 🚀
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Hệ thống đã thiết lập thành công Path Alias (<code className="text-indigo-400 bg-slate-900 px-1.5 py-0.5 rounded">@/*</code>),
            Tailwind CSS v4, shadcn/ui, TanStack Query và Axios.
          </p>
        </div>

        {/* Status Check Section */}
        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur text-slate-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Kiểm tra kết nối API & TanStack Query:
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <p className="text-slate-400 animate-pulse">Đang kiểm tra kết nối API...</p>}
            {isError && <p className="text-rose-400">Không thể kết nối đến API thử nghiệm.</p>}
            {data && (
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-sm text-slate-300">
                <span className="text-emerald-400">✓ Connected:</span> {JSON.stringify(data)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Installed Libraries Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-200">
            Danh sách công cụ & thư viện đã tích hợp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {installedTechs.map((tech) => {
              const Icon = tech.icon;
              return (
                <Card key={tech.name} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all duration-200 text-slate-100">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg bg-slate-950 border border-slate-800 ${tech.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                        {tech.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold">{tech.name}</CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      {tech.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white w-full sm:w-auto">
            Bắt đầu phát triển
          </Button>
          <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300 w-full sm:w-auto">
            Xem Tài liệu shadcn/ui
          </Button>
        </div>

      </div>
    </div>
  );
}