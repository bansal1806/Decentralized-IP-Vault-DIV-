import { notFound } from "next/navigation";
import { MOCK_ASSETS } from "@/lib/mock-db";
import { OpportunityPageContent } from "@/components/features/marketplace/OpportunityPageContent";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AssetDetailPage({ params }: PageProps) {
    const { id } = await params;
    const asset = MOCK_ASSETS.find((a) => a.id === id);

    if (!asset) {
        return notFound();
    }

    return <OpportunityPageContent asset={asset} />;
}
