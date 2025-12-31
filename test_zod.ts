
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const result = schema.safeParse({ name: 123, age: "wrong" });

if (!result.success) {
  console.log("Flatten (Instance):", JSON.stringify(result.error.flatten(), null, 2));
  
  try {
      // @ts-ignore
      console.log("Flatten (Utility):", JSON.stringify(z.flattenError(result.error), null, 2));
  } catch (e) {
      console.log("Flatten Utility Error:", e);
  }

  try {
      // @ts-ignore
      console.log("Treeify (Utility):", JSON.stringify(z.treeifyError(result.error), null, 2));
  } catch (e) {
      console.log("Treeify Utility Error:", e);
  }
}
