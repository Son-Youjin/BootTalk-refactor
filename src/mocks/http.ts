import cors from "cors";
import express from "express";
import { createMiddleware } from "@mswjs/http-middleware";
import { handlers } from "./handlers";

const app = express();
const port = 9090; // Mock

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json()); // JSON 요청 파싱
app.use(createMiddleware(...handlers)); // MSW 핸들러 적용

app.listen(port, () => {
  console.log(`🚀 Mock API 서버가 ${port}번 포트에서 실행 중...`);
});
