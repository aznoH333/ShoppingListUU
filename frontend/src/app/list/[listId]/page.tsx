import {ListOverviewFragment} from "@/src/app/list/[listId]/ListOverviewFragment";

export async function generateStaticParams() {
    const listIds = ['0', '1']; // Example IDs
    return listIds.map(id => ({ listId: id }));
}

interface ListPageProps {
    params: {
        listId: string;
    };
}

export default async function ListOverviewPage({params}: ListPageProps) {
    const { listId } = await params;
    // Parse the string to a number
    const listIdNumber = parseInt(listId as string, 10);
    // Handle invalid number case
    if (isNaN(listIdNumber)) {
        return <div>Error: Invalid List ID diaosdoasduioyasyioduasoid {listId} : {listIdNumber}</div>;
    }

    return <ListOverviewFragment listId={listIdNumber} />;
}