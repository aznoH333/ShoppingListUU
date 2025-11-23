import {ListOverviewFragment} from "@/src/app/list/[listId]/ListOverviewFragment";

export async function generateStaticParams() {
    const listIds = ["69207b922f25bf4e99fe4466", "6921b16ae152cd26ce89a8e3"]; // TODO : this sucks but it has to be here to make the static export work
    return listIds.map(id => ({ listId: id }));
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