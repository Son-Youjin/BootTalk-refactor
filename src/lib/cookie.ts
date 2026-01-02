export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // 서버 사이드 렌더링 대응

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}
