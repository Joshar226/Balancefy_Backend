import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AssetController } from "../controllers/AssetController";
import { IncomeController } from "../controllers/IncomeController";
import { incomeExist } from "../middleware/income";
import { ExpenseController } from "../controllers/ExpenseController";
import { expenseExist } from "../middleware/expense";
import { assetExist } from "../middleware/asset";
import { LiabilityController } from "../controllers/LiabilityController";
import { liabilityExist } from "../middleware/liability";
import { DashboardController } from "../controllers/DashboardController";

const router = Router()

router.param('incomeId', incomeExist)
router.param('expenseId', expenseExist)
router.param('assetId', assetExist)
router.param('liabilityId', liabilityExist)

//INCOMES
router.post('/incomes',
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    IncomeController.createIncome
)

router.get('/incomes', IncomeController.getAllIncomes)

router.get('/incomes/:incomeId',
    param('incomeId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    IncomeController.getIncomeById
)

router.put('/incomes/:incomeId',
    param('incomeId').isMongoId().withMessage('Invalid ID'),
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    IncomeController.updateIncomebyId
)

router.delete('/incomes/:incomeId',
    param('incomeId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    IncomeController.deleteIncomebyId
)





//EXPENSES
router.post('/expenses',
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    ExpenseController.createExpense
)

router.get('/expenses', ExpenseController.getAllExpenses)

router.get('/expenses/:expenseId',
    param('expenseId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    ExpenseController.getExpenseById
)

router.put('/expenses/:expenseId',
    param('expenseId').isMongoId().withMessage('Invalid ID'),
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    ExpenseController.updateExpenseById
)

router.delete('/expenses/:expenseId',
    param('expenseId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    ExpenseController.deleteExpensebyId
)




//ASSETS
router.post('/assets',
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    AssetController.createAsset
)

router.get('/assets', AssetController.getAllAssets)

router.get('/assets/:assetId',
    param('assetId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    AssetController.getAssetById
)

router.put('/assets/:assetId',
    param('assetId').isMongoId().withMessage('Invalid ID'),
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    AssetController.updateAssetById
)

router.delete('/assets/:assetId',
    param('assetId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    AssetController.deleteAssetById
)




//LIABILITIES
router.post('/liabilities',
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    LiabilityController.createLiability
)

router.get('/liabilities', LiabilityController.getAllLiabilities)

router.get('/liabilities/:liabilityId',
    param('liabilityId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    LiabilityController.getLiabilityById
)

router.put('/liabilities/:liabilityId',
    param('liabilityId').isMongoId().withMessage('Invalid ID'),
    body('title')
        .notEmpty().withMessage('A title is required'),
    body('value')
        .notEmpty().withMessage('A value is required')
        .isNumeric().withMessage('It must be a number'),
    handleInputErrors,
    LiabilityController.updateLiabilitybyId
)

router.delete('/liabilities/:liabilityId',
    param('liabilityId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    LiabilityController.deleteLiabilitybyId
)




//DASHBOARD
router.get('/dashboard', DashboardController.getAllData)
router.get('/dashboard/balance', DashboardController.getIncomeExpenseData)


export default router