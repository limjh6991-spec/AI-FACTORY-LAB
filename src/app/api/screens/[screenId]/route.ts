import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ screenId: string }> }
) {
  try {
    const { screenId } = await params;
    
    // 화면 폴더 경로
    const screenDir = path.join(process.cwd(), "generated", "screens", screenId);
    
    // 폴더 존재 확인
    if (!fs.existsSync(screenDir)) {
      return NextResponse.json(
        { error: `화면을 찾을 수 없습니다: ${screenId}` },
        { status: 404 }
      );
    }
    
    // 메타데이터 로드
    const metadataPath = path.join(screenDir, "metadata.json");
    let metadata = null;
    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
    }
    
    // HTML 콘텐츠 로드
    const htmlPath = path.join(screenDir, "preview.html");
    let htmlContent = null;
    if (fs.existsSync(htmlPath)) {
      htmlContent = fs.readFileSync(htmlPath, "utf-8");
    }
    
    // SQL 쿼리 로드
    const sqlPath = path.join(screenDir, "query.sql");
    let sqlQuery = null;
    if (fs.existsSync(sqlPath)) {
      sqlQuery = fs.readFileSync(sqlPath, "utf-8");
    }
    
    // React 컴포넌트 로드
    const reactPath = path.join(screenDir, "component.tsx");
    let reactContent = null;
    if (fs.existsSync(reactPath)) {
      reactContent = fs.readFileSync(reactPath, "utf-8");
    }
    
    return NextResponse.json({
      success: true,
      screenId,
      metadata,
      htmlContent,
      sqlQuery,
      reactContent,
    });
  } catch (error) {
    console.error("[ERROR] Screen API:", error);
    return NextResponse.json(
      { error: `화면 로드 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}` },
      { status: 500 }
    );
  }
}
