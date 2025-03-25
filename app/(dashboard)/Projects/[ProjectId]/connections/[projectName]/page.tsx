// import TestComponents from './testComponent';

import AddNewDeviceSheet from '@/components/Data-Tables/addNewDevice-sheet';
import { DeviceDB } from '@/types';
import { Share2 } from 'lucide-react';
import { columns } from './columns';
import ConnectDataTable from './connectData-table';
import { getDevices } from '@/lib/getDevice';

const ProjectNamePage = async ({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) => {
  const devices = await getDevices();
  // const { projectName} = params;
  const { projectName } = await params;
  const decodedProjectName = decodeURIComponent(projectName);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-5 p-10">
        <div className="flex flex-row gap-4 text-custom-green2 mb-3">
          <Share2 />
          <div className="text-xl font-bold">
            Connections for: {decodedProjectName}
          </div>
        </div>
        <ConnectDataTable data={devices} columns={columns} />
      </div>
    </div>
  );
};

export default ProjectNamePage;
