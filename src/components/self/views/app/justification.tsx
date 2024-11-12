'use client'
import withLayout from "@/hocs/withLayout";
import {Absences, columns} from "@/app/(app)/justification/columns";
import {DataTable} from "@components/self/ui/data-table";

const JustificationComponent = () => {
    const data: Absences[] = [{
        id: "1",
        status: "pending",
        created_at: "Lunes 12 de Noviembre"
    }];

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}

export default withLayout(JustificationComponent);