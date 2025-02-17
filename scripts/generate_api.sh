npm run openapi

fd -t f . src/services/api -E "typings.d.ts" -E "index.ts" -x sed -i '1i\import type { API } from "@/services/api/typings";' {}
fd -t f . src/services/api -E "typings.d.ts" -E "index.ts" -x sed -i '/\/\/ @ts-ignore/d' {}
echo "export type { API };" >> src/services/api/typings.d.ts