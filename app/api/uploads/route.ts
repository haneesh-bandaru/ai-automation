import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";

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
      return the data in the following format and also the returned data is a perfect json. Make sure to return the data in the following format:
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
** choose only one stack technology and if needed add more than one technology **
            "frontend": [
                "{frontend_tech_1}",
                ],
            "backend": [
                "{backend_tech_1}",
            ],
            "database": [
                "{database_tech_1}",
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
      //     type: SchemaType.OBJECT,
      //     properties: {
      //       response: {
      //         type: SchemaType.OBJECT,
      //         properties: {
      //           project_name: {
      //             type: SchemaType.STRING,
      //           },
      //           phases: {
      //             type: SchemaType.ARRAY,
      //             items: {
      //               type: SchemaType.OBJECT,
      //               properties: {
      //                 phase: {
      //                   type: SchemaType.STRING,
      //                 },
      //                 description: {
      //                   type: SchemaType.STRING,
      //                 },
      //                 duration: {
      //                   type: SchemaType.STRING,
      //                 },
      //                 tasks: {
      //                   type: SchemaType.OBJECT,
      //                   properties: {
      //                     task_id: {
      //                       type: SchemaType.STRING,
      //                     },
      //                     task_name: {
      //                       type: SchemaType.STRING,
      //                     },
      //                     time_allocated: {
      //                       type: SchemaType.STRING,
      //                     },
      //                     tech_stack: {
      //                       type: SchemaType.STRING,
      //                     },
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //           project_timeline: {
      //             type: SchemaType.STRING,
      //           },
      //           budget_estimation: {
      //             type: SchemaType.OBJECT,
      //             properties: {
      //               development_team: {
      //                 type: SchemaType.OBJECT,
      //                 properties: {
      //                   range: {
      //                     type: SchemaType.STRING,
      //                   },
      //                 },
      //               },
      //               design: {
      //                 type: SchemaType.OBJECT,
      //                 properties: {
      //                   range: {
      //                     type: SchemaType.STRING,
      //                   },
      //                 },
      //               },
      //               third_party_apis: {
      //                 type: SchemaType.OBJECT,
      //                 properties: {
      //                   range: {
      //                     type: SchemaType.STRING,
      //                   },
      //                 },
      //               },
      //               hosting: {
      //                 type: SchemaType.OBJECT,
      //                 properties: {
      //                   range: {
      //                     type: SchemaType.STRING,
      //                   },
      //                 },
      //               },
      //               miscellaneous: {
      //                 type: SchemaType.OBJECT,
      //                 properties: {
      //                   range: {
      //                     type: SchemaType.STRING,
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //           security_considerations: {
      //             type: SchemaType.ARRAY,
      //             items: {
      //               type: SchemaType.STRING,
      //             },
      //           },
      //           risks_and_mitigations: {
      //             type: SchemaType.ARRAY,
      //             items: {
      //               type: SchemaType.OBJECT,
      //               properties: {
      //                 risk: {
      //                   type: SchemaType.STRING,
      //                 },
      //                 mitigation: {
      //                   type: SchemaType.STRING,
      //                 },
      //               },
      //             },
      //           },
      //           technology_stack: {
      //             type: SchemaType.OBJECT,
      //             properties: {
      //               frontend: {
      //                 type: SchemaType.ARRAY,
      //                 items: {
      //                   type: SchemaType.STRING,
      //                 },
      //               },
      //               backend: {
      //                 type: SchemaType.ARRAY,
      //                 items: {
      //                   type: SchemaType.STRING,
      //                 },
      //               },
      //               database: {
      //                 type: SchemaType.ARRAY,
      //                 items: {
      //                   type: SchemaType.STRING,
      //                 },
      //               },
      //               authentication: {
      //                 type: SchemaType.ARRAY,
      //                 items: {
      //                   type: SchemaType.STRING,
      //                 },
      //               },
      //               storage: {
      //                 type: SchemaType.ARRAY,
      //                 items: {
      //                   type: SchemaType.STRING,
      //                 },
      //               },
      //               encryption: {
      //                 type: SchemaType.STRING,
      //               },
      //               push_notifications: {
      //                 type: SchemaType.STRING,
      //               },
      //             },
      //           },
      //           features: {
      //             type: SchemaType.ARRAY,
      //             items: {
      //               type: SchemaType.STRING,
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
