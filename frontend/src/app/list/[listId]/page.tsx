import {ListOverviewFragment} from "@/src/app/list/[listId]/ListOverviewFragment";
import {supportedIds} from "@/src/types/supportedIds";

export async function generateStaticParams() {
     // TODO : this sucks but it has to be here to make the static export work
    return supportedIds.map(id => ({ listId: id }));
}

interface ListPageProps {
    params: {
        listId: string;
    };
}

export default async function ListOverviewPage({params}: ListPageProps) {
    const { listId } = await params;

    return <ListOverviewFragment listId={listId} />;
}