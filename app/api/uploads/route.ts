import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure the correct import
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

const { GEMINI_API_KEY } = process.env;

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request to extract the PDF buffer

    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          response: "File not found in form data",
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    //method to get buffer from the file
    const buffer = await file.arrayBuffer();

    //convert buffer to text
    const fileText: string = Buffer.from(buffer).toString("utf-8");

    // Initialize the Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

    // Retrieve the generative model configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `you are a project manager who have to create tasks based on the given pdf.
      return the data in the following format:
      {
    "response": {
        "project_name": "{project_name}",
        "phases": [
            {
                "phase": "{phase_name_1}",
                "description": "{phase_description_1}",
                "duration": "{phase_duration_1}",
                "tasks": {
                    "task_id": "{task_id_1}",
                    "task_name": "{task_name_1}",
                    "time_allocated": "{time_allocated_1}",
                    "tech_stack": "{tech_stack_1}"
                }
            },
            {
                "phase": "{phase_name_2}",
                "description": "{phase_description_2}",
                "duration": "{phase_duration_2}",
                "tasks": {
                    "task_id": "{task_id_2}",
                    "task_name": "{task_name_2}",
                    "time_allocated": "{time_allocated_2}",
                    "tech_stack": "{tech_stack_2}"
                }
            },
            {
                "phase": "{phase_name_N}",
                "description": "{phase_description_N}",
                "duration": "{phase_duration_N}",
                "tasks": {
                    "task_id": "{task_id_N}",
                    "task_name": "{task_name_N}",
                    "time_allocated": "{time_allocated_N}",
                    "tech_stack": "{tech_stack_N}"
                }
            }
        ],
        "project_timeline": "{project_timeline}",
        "budget_estimation": {
            "{budget_category_1}": {
                "range": "{budget_range_1}"
            },
            "{budget_category_2}": {
                "range": "{budget_range_2}"
            },
            "{budget_category_N}": {
                "range": "{budget_range_N}"
            }
        },
        "security_considerations": [
            "{security_consideration_1}",
            "{security_consideration_2}",
            "{security_consideration_N}"
        ],
        "risks_and_mitigations": [
            {
                "risk": "{risk_1}",
                "mitigation": "{mitigation_1}"
            },
            {
                "risk": "{risk_2}",
                "mitigation": "{mitigation_2}"
            },
            {
                "risk": "{risk_N}",
                "mitigation": "{mitigation_N}"
            }
        ],
        "technology_stack": {
            "frontend": [
                "{frontend_tech_1}",
                "{frontend_tech_2}",
                "{frontend_tech_N}"
            ],
            "backend": [
                "{backend_tech_1}",
                "{backend_tech_2}",
                "{backend_tech_N}"
            ],
            "database": [
                "{database_tech_1}",
                "{database_tech_2}",
                "{database_tech_N}"
            ],
            "authentication": [
                "{authentication_tech_1}",
                "{authentication_tech_2}"
            ],
            "storage": [
                "{storage_tech_1}",
                "{storage_tech_2}"
            ],
            "encryption": "{encryption_tech}",
            "push_notifications": "{push_notifications_tech}"
        },
        "features": [
            "{feature_1}",
            "{feature_2}",
            "{feature_N}"
        ]
    }
}

      
      `,
    });

    // Define the generation configuration
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      //   responseSchema: {
      //     type: "object",
      //     properties: {
      //       response: {
      //         type: "object",
      //         properties: {
      //           project_name: {
      //             type: "string",
      //           },
      //           phases: {
      //             type: "array",
      //             items: {
      //               type: "object",
      //               properties: {
      //                 phase: {
      //                   type: "string",
      //                 },
      //                 description: {
      //                   type: "string",
      //                 },
      //                 duration: {
      //                   type: "string",
      //                 },
      //                 tasks: {
      //                   type: "object",
      //                   properties: {
      //                     task_id: {
      //                       type: "string",
      //                     },
      //                     task_name: {
      //                       type: "string",
      //                     },
      //                     time_allocated: {
      //                       type: "string",
      //                     },
      //                     tech_stack: {
      //                       type: "string",
      //                     },
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //           project_timeline: {
      //             type: "string",
      //           },
      //           budget_estimation: {
      //             type: "object",
      //             properties: {
      //               development_team: {
      //                 type: "object",
      //                 properties: {
      //                   range: {
      //                     type: "string",
      //                   },
      //                 },
      //               },
      //               design: {
      //                 type: "object",
      //                 properties: {
      //                   range: {
      //                     type: "string",
      //                   },
      //                 },
      //               },
      //               third_party_apis: {
      //                 type: "object",
      //                 properties: {
      //                   range: {
      //                     type: "string",
      //                   },
      //                 },
      //               },
      //               hosting: {
      //                 type: "object",
      //                 properties: {
      //                   range: {
      //                     type: "string",
      //                   },
      //                 },
      //               },
      //               miscellaneous: {
      //                 type: "object",
      //                 properties: {
      //                   range: {
      //                     type: "string",
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //           security_considerations: {
      //             type: "array",
      //             items: {
      //               type: "string",
      //             },
      //           },
      //           risks_and_mitigations: {
      //             type: "array",
      //             items: {
      //               type: "object",
      //               properties: {
      //                 risk: {
      //                   type: "string",
      //                 },
      //                 mitigation: {
      //                   type: "string",
      //                 },
      //               },
      //             },
      //           },
      //           technology_stack: {
      //             type: "object",
      //             properties: {
      //               frontend: {
      //                 type: "array",
      //                 items: {
      //                   type: "string",
      //                 },
      //               },
      //               backend: {
      //                 type: "array",
      //                 items: {
      //                   type: "string",
      //                 },
      //               },
      //               database: {
      //                 type: "array",
      //                 items: {
      //                   type: "string",
      //                 },
      //               },
      //               authentication: {
      //                 type: "array",
      //                 items: {
      //                   type: "string",
      //                 },
      //               },
      //               storage: {
      //                 type: "array",
      //                 items: {
      //                   type: "string",
      //                 },
      //               },
      //               encryption: {
      //                 type: "string",
      //               },
      //               push_notifications: {
      //                 type: "string",
      //               },
      //             },
      //           },
      //           features: {
      //             type: "array",
      //             items: {
      //               type: "string",
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
    };

    // Start a chat session with the generative model
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Send the extracted text to the generative model
    const result = await chatSession.sendMessage(fileText);
    // Return the AI-generated response
    return NextResponse.json({
      response: JSON.parse(result.response.text()),
      status: StatusCodes.OK,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
