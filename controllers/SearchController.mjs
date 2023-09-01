import {
  searchReportsModel,
  searchCategoriesModel,
} from "../models/SearchModel.mjs"

export const searchReports = async (req, res) => {
  try {
    const query = req.query.q
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query parameter is missing." })
    }
    const reports = await searchReportsModel(query)
    res.status(200).json({ success: true, reports })
  } catch (error) {
    console.error(
      "An error occurred while searching reports:",
      error,
      "Request:",
      req
    )
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while searching reports.",
      })
  }
}

export const searchCategories = async (req, res) => {
  try {
    const query = req.query.q
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query parameter is missing." })
    }
    const categories = await searchCategoriesModel(query)
    res.status(200).json({ success: true, categories })
  } catch (error) {
    console.error(
      "An error occurred while searching categories:",
      error,
      "Request:",
      req
    )
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while searching categories.",
      })
  }
}
