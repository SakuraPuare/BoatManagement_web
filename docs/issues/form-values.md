# docs: add form defaultValues issue documentation

## description

defaultValues fillment undefined with zod, react-hook-form and shadcn

我有page.tsx 和 user-dialog.tsx，用于创建表单修改，但是在填充修改的原始值时遇到了问题

```tsx
"use client";

import { useState } from "react";
import { User } from "@/types/user";
import UserDialog from "@/components/user-dialog";
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const addUser = () => {
    setUser(null);
    console.log("addUser", user);
    setOpen(true);
  };

  const updateUser = () => {
    setUser({ id: "1", name: "John Doe", email: "john.doe@example.com" });
    console.log("updateUser", user);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <button onClick={addUser}>Open with add</button>
        <button onClick={updateUser}>Open with update</button>
      </div>
      <UserDialog open={open} onOpenChange={setOpen} user={user} />
    </div>
  );
}
```


```tsx
import { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function UserDialog({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}) {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
  });

  console.log(user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });
  console.log(form.getValues());

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Update User" : "Add User"}</DialogTitle>
          <DialogDescription>
            Fill in the information below to {user ? "update" : "add"} a user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

按道理来说defaultValues应该填充 user中的值，当 user非null时，然而，我使用console.log打印值时 他们确时有值

## analysis

useForm 的 defaultValues 只在组件首次渲染时生效。当 user 改变时，表单并不会自动更新。

## solution

```tsx
// 方案1：使用 reset
useEffect(() => {
  if (user) {
    form.reset({
      name: user.name,
      email: user.email,
    });
  }
}, [user, form]);
// not work, because form.reset induce re-render and cause infinite loop

// 方案2：使用 values 属性
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    email: "",
  },
  values: {
    name: user?.name || "",
    email: user?.email || "",
  },
});
// work, very fucking good

// 方案3：使用 key 强制重新渲染
return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <Form key={user?.id} {...form}>
        {/* ... */}
      </Form>
    </DialogContent>
  </Dialog>
);
```


