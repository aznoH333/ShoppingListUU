import {ListOverviewFragment} from "@/src/app/list/[listId]/ListOverviewFragment";

export async function generateStaticParams() {
    const maxListId = 10; // TODO : this sucks but i am too lazy to figure out a better solution xdd
    const listIds = Array.from({ length: maxListId + 1 }, (_, index) => `${index}`);
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