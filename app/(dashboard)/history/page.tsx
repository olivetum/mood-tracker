import { getUserByClerkID } from "@/utils/auth";
import { prisma} from "@/utils/db";
import HistoryChart from "@/components/HistoryChart";
import {ascending} from "d3-array";

const getData = async () => {
    const user = await getUserByClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'asc',
        }

    });
    const sum = analyses.reduce((all,  current) => all + current.sentimentScore, 0);
    const avg = Math.round(sum/analyses.length);
    return {analyses, avg}
}
const HistoryPage = async () => {
    const {avg, analyses} = await getData();
    for (let analysis of analyses) {
        console.log(`Sentiment value: ${analysis.sentimentScore} \n`);
    }

    return (
        <div className="h-full px-6">
            <h1 className="text-xl mt-4 mb-12">History: {avg}</h1>
            <div className="h-96"><HistoryChart data={analyses}/></div>
        </div>
    )
}

export default  HistoryPage