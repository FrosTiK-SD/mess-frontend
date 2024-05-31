"use client";
import { Spinner, Typography } from "@/components/components";
import { studentStatsByMessIdDemoResponse } from "@/temp/student";
import { MessPopulated } from "@/types/mess";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Accordion, ScrollArea } from "@mantine/core";
import { GetName } from "@/utils/student";
import { User } from "@/types/user";

function StudentViewer({ mess }: { mess: MessPopulated }) {
  const studentStats = useQuery({
    queryKey: [`mess_${mess._id}_student_stats`],
    queryFn: () => {
      return studentStatsByMessIdDemoResponse;
    },
  });

  return (
    <div className="m-2">
      <Typography variant="h6">Student Statistics</Typography>
      {studentStats.isLoading && (
        <div className="my-5 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!studentStats.isLoading && (
        <div>
          <Accordion>
            <Accordion.Item value={"attended"}>
              <Accordion.Control>Attended Students</Accordion.Control>
              <Accordion.Panel>
                <div className="max-h-[300px] overflow-y-scroll">
                  {studentStats.data?.attended.map((student) => (
                    <div
                      key={`Mess_${mess._id}_Student_${student._id}`}
                      className="my-1 flex items-center justify-between py-2 pt-1"
                    >
                      <div>
                        <Typography variant="h6">
                          {GetName(student as User)}
                        </Typography>
                        <p className="mt-[-1px] text-xs">
                          {student.rollNo} {student.department}
                        </p>
                      </div>
                      <div>
                        <Typography variant="h6">
                          {student.allocatedHostel}
                        </Typography>
                        <p className="mt-[-1px] text-xs">
                          {student.allocatedRoom}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value={"absent"}>
              <Accordion.Control>Absent Students</Accordion.Control>
              <Accordion.Panel>
                <div className="max-h-[300px] overflow-y-scroll">
                  {studentStats.data?.notAttended.map((student) => (
                    <div
                      key={`Mess_${mess._id}_Student_${student._id}`}
                      className="my-1 flex items-center justify-between py-2 pt-1"
                    >
                      <div>
                        <Typography variant="h6">
                          {GetName(student as User)}
                        </Typography>
                        <p className="mt-[-1px] text-xs">
                          {student.rollNo} {student.department}
                        </p>
                      </div>
                      <div>
                        <Typography variant="h6">
                          {student.allocatedHostel}
                        </Typography>
                        <p className="mt-[-1px] text-xs">
                          {student.allocatedRoom}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value={"notEnrolled"}>
              <Accordion.Control>Not Enrolled Students</Accordion.Control>
              <Accordion.Panel>
                <div className="max-h-[300px] overflow-y-scroll">
                  {studentStats.data?.notEnrolled.map((student) => (
                    <div
                      key={`Mess_${mess._id}_Student_${student._id}`}
                      className="my-1 flex items-center justify-between py-2 pt-1"
                    >
                      <div>
                        <Typography variant="h6">
                          {GetName(student as User)}
                        </Typography>
                        <p className="mt-[-1px] text-xs">
                          {student.rollNo} {student.department}
                        </p>
                      </div>
                      <div>
                        <Typography variant="h6">
                          {student.allocatedHostel}
                        </Typography>
                        <p className="mt-[-1px] text-xs">
                          {student.allocatedRoom}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </div>
  );
}

export default StudentViewer;
