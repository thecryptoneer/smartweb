import Layout from "@/components/dom/Layout";
import StyledComponentsRegistry from "./lib/registry";
import "@/global.css";

export const metadata = {
    title: "smart web - digital solutions",
    description: "smart web - digital solutions is an engineering and design studio based in Germany. We help you build best-in-class digital products and services to grow your business and delight your customers. We are experts in web3, blockchain, and decentralized finance (DeFi) technologies. We are also available for consulting and training services. Contact us today to learn more about how we can help you succeed in the digital age",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <StyledComponentsRegistry>
                    <Layout>{children}</Layout>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
