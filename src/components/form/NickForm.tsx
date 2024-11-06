"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search } from "lucide-react";

const formSchema = z.object({
  nickname: z.string(),
  region: z.string(),
});

const NickForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      region: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.region == "") {
      toast.info("Selecione a região");
      return;
    }

    if (!values.nickname.includes("#")) {
      toast.info("Insira a tag. Ex: #BR1");
      return;
    }

    const fullNick = values.nickname.split("#");
    const gameName = fullNick[0] as string;
    const tagLine = fullNick[1].toUpperCase() as string;

    try {
      const req = await fetch(
        `/api/get-summoner?nick=${gameName}&tagline=${tagLine}&region=${values.region}`
      );
      if (req.status !== 200) {
        toast.error(
          "Verifique se as informações inseridas estão corretas. Região e Nick"
        );
        return;
      } else {
        return router.push(
          `/summoner/${values.region}/${gameName}-${tagLine}/overview`
        );
      }
    } catch (error) {
      toast.error(`${error}`);
      return console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2 bg-slate-950 text-amber-100 p-2 w-fit border-[1px] border-amber-400">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger className="w-[180px] border-none focus:ring-transparent">
                      <SelectValue
                        placeholder="Region"
                        className="focus:ring-transparent"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-amber-100">
                      <SelectItem value="br1">Brazil</SelectItem>
                      <SelectItem value="eun1">Europe Nordic & East</SelectItem>
                      <SelectItem value="euw1">Europe West</SelectItem>
                      <SelectItem value="jp1">Japan</SelectItem>
                      <SelectItem value="kr">Korea</SelectItem>
                      <SelectItem value="la1">Latin America North</SelectItem>
                      <SelectItem value="la2">Latin America South</SelectItem>
                      <SelectItem value="me1">Middle East</SelectItem>
                      <SelectItem value="na1">North America</SelectItem>
                      <SelectItem value="oc1">Oceania</SelectItem>
                      <SelectItem value="ph2">The Philippines</SelectItem>
                      <SelectItem value="ru">Russia</SelectItem>
                      <SelectItem value="sg2">Singapore</SelectItem>
                      <SelectItem value="tr1">System</SelectItem>
                      <SelectItem value="tw2">Taiwan</SelectItem>
                      <SelectItem value="vn2">Vietnam</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Game Name                                  # Tagline"
                    {...field}
                    required
                    className="w-64 border-none focus-visible:ring-transparent placeholder:text-justify"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button className="bg-slate-800 rounded-full border-[1px] border-amber-400 box-border p-1 cursor-pointer hover:bg-slate-800/70">
            <Search size={18} />
          </button>
        </div>
      </form>
    </Form>
  );
};

export default NickForm;
