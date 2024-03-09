import { styled } from "@yas/style";
import {
  Button,
  DatePicker,
  Linklike,
  Stack as StackImpl,
  TabItem,
  Tabs,
  Text,
} from "@yas/ui";
import { Suspense } from "react";
import { api, enabledWhenDefined, type types } from "@yas/trpc-client";
import { startOfToday } from "@yas/time";
import { getRouteApi, useSearchState } from "@yas/router";
import { DownloadIcon } from "@yas/icons";
import { useFileIO } from "@yas/hooks";
import { Title } from "./Title";
import { DashboardContent, DashboardSkeleton } from "./OverviewContent";

const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

const routeApi = getRouteApi("/dashboard/");

export default function Overview(): JSX.Element {
  const [{ userId, date = startOfToday() }, setSearch] =
    useSearchState(routeApi);

  const { save } = useFileIO();
  const setDate = (date?: Date) => setSearch({ date }, { replace: true });
  const setUserId = (userId?: types.example.UserId) => setSearch({ userId });

  const clearSelectedUser = () => setUserId(undefined);

  const selectedUser = api.example.users.get.useQuery(
    ...enabledWhenDefined(userId),
  );

  async function downloadPDF() {
    const { pdf } = await import("@yas/pdf");
    const { OverviewPDF } = await import("./OverviewPDF");
    const blob = await pdf(<OverviewPDF />).toBlob();
    save(new File([blob], "overview.pdf", { type: blob.type }));
  }

  return (
    <>
      <Stack direction="row" justify="spaceBetween" fullWidth>
        <Title
          showClearButton={!!selectedUser.data}
          onClear={clearSelectedUser}
        >
          Dashboard
          {selectedUser.data ? ` for ${selectedUser.data.name}` : undefined}
        </Title>
        <Stack direction="row" gap="#2" style={{ flex: 0 }}>
          <Button icon onClick={downloadPDF}>
            <DownloadIcon />
          </Button>
          <DatePicker value={date} onChange={setDate} />
        </Stack>
      </Stack>
      {selectedUser.error ? (
        <Text>Could not find user by id {userId}</Text>
      ) : (
        <>
          <Tabs variant="contained" sx={{ flex: 1 }}>
            {secondaryNav.map((label, index) => (
              <TabItem asChild key={index} active={index === 0}>
                <Linklike>{label}</Linklike>
              </TabItem>
            ))}
          </Tabs>
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent filter={{ date, userId }} />
          </Suspense>
        </>
      )}
    </>
  );
}

const Stack = styled(StackImpl).attrs({ gap: "#4" });
