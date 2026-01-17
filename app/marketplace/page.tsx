
import { fetchAssets } from "@/app/actions/assets";
import { MarketplaceClient } from "@/components/features/marketplace/MarketplaceClient";

export default async function MarketplacePage() {
    const assets = await fetchAssets();

    return <MarketplaceClient initialAssets={assets} />;
}
