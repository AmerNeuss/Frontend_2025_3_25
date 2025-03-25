/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashboardWrapper } from '@/components/dashboard/dashboard-wrapper';
import { ChartItem, Dashboard } from '@/types';

async function getDashboardsById(
  ProjectId: number,
  dashboardId: number
): Promise<Dashboard> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${ProjectId}/dashboards/${dashboardId}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
async function getAllCharts(): Promise<ChartItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/Charts/dashboards/GetAllChart`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const EditScreenPage = async ({
  params,
}: {
  params: Promise<{ dashboardId: number; ProjectId: number }>;
}) => {
  const { ProjectId, dashboardId } = await params;
  const dashboard = await getDashboardsById(ProjectId, dashboardId);
  const chartData = await getAllCharts();

  return (
    <div>
      <DashboardWrapper
        ProjectId={ProjectId}
        charts={chartData}
        dashboardId={dashboardId}
        dashboardName={dashboard.name}
      />
    </div>
  );
};

export default EditScreenPage;

// async function getProjectById(id: number): Promise<Projects> {
//   const res = await fetch(`https://localhost:7219/api/projects/${id}/dashboards/${}`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }
// const EditScreenPage = ({
//   params: { ProjectId, dashboardId },
// }: {
//   params: { ProjectId: number; dashboardId: string }; // ✅ تغيير number إلى string
// }) => {
//   return (
//     <div>
//       <DashboardWrapper ProjectId={ProjectId} />
//     </div>
//   );
// };
// export default EditScreenPage;
// const EditScreenPage = ({
//   params: { ProjectId, editId },
// }: {
//   params: { ProjectId: number; editId: number };
// }) => {
//   return (
//     <div>
//       <DashboardWrapper ProjectId={ProjectId} />
//     </div>
//   );
// };

// export default EditScreenPage;
