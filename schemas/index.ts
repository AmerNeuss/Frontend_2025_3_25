import { z } from 'zod';

// Step 1 Schema (System Settings)
const stepOneSchema = z.object({
  language: z.string().nonempty('Language is required'), // Language is required
  authenticationToken: z.string().nonempty('Authentication option is required'), // Authentication is required
  broadcastToClient: z.string().nonempty('Broadcast option is required'), // Broadcast option is required
  logFullMode: z.string().nonempty('Log full mode option is required'), // Log full mode option is required
});

// Step 2 Schema (SMTP Settings)
const stepTwoSchema = z.object({
  host: z.string().min(1, { message: 'Host is required' }), // Host is required
  port: z.string().min(1, { message: 'Port is required' }), // Port is required
  mailSender: z.string().email({ message: 'Invalid email address' }), // Email is required
  userApiKey: z.string().min(1, { message: 'User/ApiKey is required' }), // API key is required
  password: z.string().min(1, { message: 'Password is required' }), // Password is required
  emailTest: z.string().email({ message: 'Invalid email address for test' }), // Email test is required
});

// Step 3 Schema (DAQ Storage Settings)
const stepThreeSchema = z.object({
  retentionDAQ: z.string().nonempty('retentionDAQ option is required'),
  Alarmsretention: z.string().nonempty('Alarmsretention option is required'),
});

export const CampaignFormSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
});

export { stepOneSchema, stepTwoSchema, stepThreeSchema };

export const ConnectionSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    dataAccess:z.string().optional(),
    databaseName: z.string().optional(),
    description: z.string().optional(),
    lastConnected: z.string().optional(),
    polling: z.number().optional(),
    isActive: z.boolean(),
    method: z.string().optional(),
    format: z.string().optional(),
    address: z.string().optional(),
    ip: z.string().optional(),
    port: z.number().optional(),
    host: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    // DSN: z.string().optional(),
    slot: z.number().optional(),
    rack: z.number().optional(),
    dbType: z.string().optional(),
    // property: z.object({
    //   method: z.string().optional(),
    //   format: z.string().optional(),
    //   address: z.string().optional(),
    //   ip: z.string().optional(),
    //   port: z.number().optional(),
    //   host: z.number().optional(),
    //   username: z.string().optional(),
    //   password: z.string().optional(),
    //   DSN: z.string().optional(),
    //   slot: z.number().optional(),
    //   rack: z.number().optional(),
    //   databaseType: z.string().optional(), // Add this field for database type
    // }),
  })
  .superRefine((data, ctx) => {
    // If isActive is true, type is required
    if (data.isActive && !data.databaseName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Database Name is required',
        path: ['databaseName'],
      });
    }
   

    // Type-specific validations
    if (data.databaseName === 'WebAPI') {
      if (!data.method) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Method is required for WebAPI databaseName',
          path: ['property', 'method'],
        });
      }
      if (!data.format) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Format is required for WebAPI type',
          path: ['property', 'format'],
        });
      }
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Address is required for WebAPI type',
          path: ['property', 'address'],
        });
      }
    }

    if (data.dataAccess === 'S7') {
      if (!data.ip) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'IP is required for S7 type',
          path: ['property', 'ip'],
        });
      }
      if (!data.port) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Port is required for S7 type',
          path: ['property', 'port'],
        });
      }
      // if (!data.slot) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Slot is required for S7 type',
      //     path: ['property', 'slot'],
      //   });
      // }
      // if (!data.rack) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Rack is required for S7 type',
      //     path: ['property', 'rack'],
      //   });
      // }
    }

    // Database-specific validations
    if (data.databaseName === 'Database' && data.isActive) {
      // Ensure databaseType is selected
      if (!data.dbType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Database type is required',
          path: ['property', 'dbType'],
        });
      }

      // Conditional validation based on dbType
      if (data.dbType === 'sqlServer') {
        // Removed SQLAlchemyURL validation here
      }

      if (data.dbType === 'mysql') {
        // Removed SQLAlchemyURL validation here
      }

      if (data.dbType === 'sqlite') {
        // Removed SQLAlchemyURL validation here
      }

      if (data.dbType === 'postgresql') {
        if (!data.port) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Port is required for PostgreSQL',
            path: ['property', 'port'],
          });
        }
        if (!data.databaseName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Database Name is required for PostgreSQL',
            path: ['property', 'databaseName'],
          });
        }
        if (!data.host) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Host is required for PostgreSQL',
            path: ['property', 'host'],
          });
        }
        if (!data.username) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Username is required for PostgreSQL',
            path: ['property', 'username'],
          });
        }
        if (!data.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password is required for PostgreSQL',
            path: ['property', 'password'],
          });
        }
      }
    }
  });

export const AddProjectSchema = z.object({
  name: z.string().max(50).min(1, { message: 'Name is required' }),
  description: z
    .string()
    .max(1000)
    .min(1, { message: 'Description is required' }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: ' email is required' }),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});
export const DashboardSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),

  description: z
    .string()
    .max(5000, { message: 'Description cannot exceed 5000 characters' })
    .optional(),

  // Allow both string and number, transforming strings to numbers
  width: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
    .refine((val) => !val || val >= 0, {
      message: 'Width must be a positive number',
    })
    .optional(),

  height: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
    .refine((val) => !val || val >= 0, {
      message: 'Height must be a positive number',
    })
    .optional(),

  backgroundColor: z.string().optional(),
  gridType: z.string().optional(),
});

export const UserSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'A valid email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  group: z.string().min(1),
});

export const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'A valid email is required' }),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please enter confirm password' }),
    phoneNumber: z
      .string()
      .refine((data) => data !== '', { message: 'Phone is required' }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Paswords do not match!',
      path: ['confirmPassword'],
    }
  );
export const EditProfileSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'A valid email is required' }),
});

export const InviteSchema = z.object({
  email: z.string().email({ message: 'A valid email is required' }),
});

export const DatasetSchema=z.object({
  datasetName: z.string().min(1, { message: "dataset name is required" }), 
  table: z.string().min(1, { message: "table is required" }), 
  schema: z.string().min(1,{ message: "schema is required" }), 
  database : z.string().min(1, { message: "database is required" }), 
})