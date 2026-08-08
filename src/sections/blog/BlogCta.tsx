import { getTranslations } from "next-intl/server";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

const CTA_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBYoJ-wk4rY8r-jx7oPQXGqk0VIt12ryKZm84xhbXz8ey_9XbRVcQRPFEVgPnM43vM9OUBjNLQQdLaJRn05JTNLa9a8es42QtmorWcg0_5H62EeqOOXT29eI0C9xjWDAje78DUz_Al6Zzidt3SByMIWcHeRYF6NM3ScpEtooDL2d7AG7SJ7YpTXEG1LgfsSQEc4799wVNbTWA1ptpEHkQqCBmWUViJdEOmyxVW9grjUHA8UBgTlErXnNw";

export async function BlogCta() {
  const t = await getTranslations("pages.blog.cta");

  return (
    <ContactCtaBanner
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      paragraph={t("paragraph")}
      image={CTA_IMAGE}
      imageAlt={t("imageAlt")}
    />
  );
}
