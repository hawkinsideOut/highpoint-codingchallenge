import { Pagination } from "@mui/material";
import { MetaData } from "../types";

const AppPagination = ({
	metaData,
	onPageChange,
}: {
	metaData: MetaData;
	onPageChange: (page: number) => void;
}) => {
	const { currentPage, totalItems } = metaData;

	return (
		<>
			<div className="flex items-center justify-center space-x-3 my-4">
				<div>
					<Pagination
						defaultPage={1}
            shape="rounded"
						variant="outlined"
						count={totalItems}
            hideNextButton={currentPage >= metaData.totalPages}
            hidePrevButton={currentPage === 1}
						page={currentPage}
						onChange={(e, page) => onPageChange(page)}
            siblingCount={5}
					/>
				</div>
			</div>
		</>
	);
};

export default AppPagination;
