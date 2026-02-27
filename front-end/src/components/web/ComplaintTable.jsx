import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getBadgeVariant(status) {
  if (status === "resolved") {
    return "default";
  }

  if (status === "inProgress") {
    return "secondary";
  }

  return "destructive";
}

function getDocsCountText(uploadedEvidence) {
  const isArray = Array.isArray(uploadedEvidence);

  if (!isArray) {
    return "";
  }

  const docsLength = uploadedEvidence.length;

  if (docsLength === 0) {
    return "";
  }

  if (docsLength === 1) {
    return "1 Doc";
  }

  return `${docsLength} Docs`;
}

function getFirstDocLink(uploadedEvidence) {
  const isArray = Array.isArray(uploadedEvidence);

  if (!isArray) {
    return "";
  }

  if (uploadedEvidence.length === 0) {
    return "";
  }

  return uploadedEvidence[0];
}

function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  return new Date(dateString).toLocaleDateString();
}

const CompalintTable = ({ data = [], title = "Complaint" }) => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6 space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        {title} List
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block w-full rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-center">Doc</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((c, index) => {
                // ✅ Safe values
                const complaintType = c?.complaintType ?? "-";
                const category = c?.category ?? "-";
                const description = c?.description ?? "-";
                const priority = c?.priority ?? "-";
                const status = c?.status ?? "unknown";
                const createdAt = c?.createdAt ?? null;

                const badgeVariant = getBadgeVariant(status);

                // ✅ Docs
                const uploadedEvidence = c?.uploadedEvidence ?? [];
                const docsCountText = getDocsCountText(uploadedEvidence);
                const firstDocLink = getFirstDocLink(uploadedEvidence);

                const hasDocs = docsCountText !== "" && firstDocLink !== "";

                const formattedDate = formatDate(createdAt);

                return (
                  <TableRow key={c?._id ?? index} className="align-middle">
                    <TableCell className="font-medium whitespace-nowrap">
                      {complaintType}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {category}
                    </TableCell>

                    <TableCell className="max-w-xs truncate text-sm">
                      {description}
                    </TableCell>

                    <TableCell className="capitalize whitespace-nowrap">
                      {priority}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      <Badge variant={badgeVariant}>{status}</Badge>
                    </TableCell>

                    <TableCell className="text-right whitespace-nowrap">
                      {formattedDate}
                    </TableCell>

                    <TableCell className="text-center whitespace-nowrap text-sm">
                      {hasDocs ? (
                        <div className="inline-flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {docsCountText}
                          </span>

                          <a
                            href={firstDocLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View
                          </a>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {data.length > 0 ? (
          data.map((c, index) => {
            const complaintType = c?.complaintType ?? "-";
            const category = c?.category ?? "-";
            const description = c?.description ?? "-";
            const priority = c?.priority ?? "-";
            const status = c?.status ?? "unknown";
            const createdAt = c?.createdAt ?? null;

            const badgeVariant = getBadgeVariant(status);

            const uploadedEvidence = c?.uploadedEvidence ?? [];
            const docsCountText = getDocsCountText(uploadedEvidence);
            const firstDocLink = getFirstDocLink(uploadedEvidence);
            const hasDocs = docsCountText !== "" && firstDocLink !== "";

            const formattedDate = formatDate(createdAt);

            return (
              <div
                key={c?._id ?? index}
                className="rounded-lg border bg-card p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground truncate">
                    {complaintType}
                  </span>
                  <Badge variant={badgeVariant}>{status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="truncate">{category}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Priority</p>
                    <p className="capitalize">{priority}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">Description</p>
                  <p className="line-clamp-2">{description}</p>
                </div>

                {/* ✅ Mobile Docs */}
                <div className="text-sm">
                  <p className="text-muted-foreground">Doc</p>

                  {hasDocs ? (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {docsCountText}
                      </span>

                      <a
                        href={firstDocLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  {formattedDate}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground">
            No data found
          </p>
        )}
      </div>
    </main>
  );
};

export default CompalintTable;
