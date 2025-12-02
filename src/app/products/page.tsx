"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";

export default function ProductManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // tRPC Query
  const { data, isLoading, refetch } = api.product.list.useQuery({
    page,
    pageSize: 50,
    searchTerm: searchTerm || undefined,
  });

  const deleteMutation = api.product.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleDelete = (id: number, name: string) => {
    if (confirm(`"${name}" 상품을 삭제하시겠습니까?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">상품 관리</CardTitle>
              <CardDescription>
                전체 {data?.total ?? 0}개 상품 (페이지 {page} / {data?.totalPages ?? 1})
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              상품 추가
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* 검색 */}
          <div className="mb-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="상품명 또는 상품코드로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={() => void refetch()}>
              검색
            </Button>
          </div>

          {/* 테이블 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="w-[120px]">상품코드</TableHead>
                  <TableHead>상품명</TableHead>
                  <TableHead className="w-[120px]">카테고리</TableHead>
                  <TableHead className="w-[120px] text-right">가격</TableHead>
                  <TableHead className="w-[80px] text-right">재고</TableHead>
                  <TableHead className="w-[80px] text-center">상태</TableHead>
                  <TableHead className="w-[120px] text-center">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.products && data.products.length > 0 ? (
                  data.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">
                          {product.productCode}
                        </code>
                      </TableCell>
                      <TableCell className="font-medium">{product.productName}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        }).format(Number(product.price))}
                      </TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            product.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.isActive ? "활성" : "비활성"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id, product.productName)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* 페이징 */}
          {data && data.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {(page - 1) * (data.pageSize ?? 50) + 1} -{" "}
                {Math.min(page * (data.pageSize ?? 50), data.total)} / {data.total}개
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  이전
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                >
                  다음
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
