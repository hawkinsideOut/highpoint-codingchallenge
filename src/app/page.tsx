"use client";

import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect, useState } from "react";
import { Status } from "./redux/types";
import { setPageNumber } from "./redux/objects/slice";
import ErrorMessage from "./components/Error";
import AppPagination from "./components/AppPagination";
import { metadata } from "./components/App";
import Image from "next/image";
import Link from "next/link";
import {
	fetchObjectsAsync,
	fetchObjectByIdAsync,
} from "./redux/objects/controller";

interface RenderedImageProps {
	src: string;
	title: string;
}

const RenderedImage = ({ src, title }: RenderedImageProps) => {
	if (!src) {
		return null;
	}

	return (
		<Image
			src={src}
			alt={title ?? ""}
			className="w-full h-auto mb-4 rounded"
			width={500}
			height={500}
		/>
	);
};

const SelectedObject = () => {
	const { selectedObject: data } = useAppSelector(
		(state) => state.objects.data
	);
	const [currentImage, setCurrentImage] = useState<string>(
		data?.primaryImage ?? ""
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!data) dispatch(fetchObjectByIdAsync("1"));
	}, [data]);

	if (!data) {
		return (
			<div className="flex items-center justify-center">
				<p className="text-gray-500">No object selected.</p>
			</div>
		);
	}

	return (
		<div
			className="flex items-center justify-center"
			data-id={data.objectID}
		>
			<div className="max-w-md p-4 border rounded-lg shadow-lg">
				<h2 className="text-xl font-bold mb-2">{data.title}</h2>
				{data.primaryImage && (
					<RenderedImage
						src={currentImage ?? data.primaryImage}
						title={data.title ?? ""}
					/>
				)}
				<div className="flex">
					{data.additionalImages && data.additionalImages.length > 0 && (
						<div className="grid grid-cols-6 gap-2">
							{data.primaryImageSmall && (
								<Image
									key={data.objectID}
									src={data.primaryImageSmall}
									alt={data.title ?? ""}
									className="w-full h-auto rounded cursor-pointer"
									width={500}
									height={500}
									onClick={() => {
										console.log("data.primaryImage", data.primaryImage);
										setCurrentImage(data.primaryImage!);
									}}
								/>
							)}
							{data.additionalImages.map((image, index) => (
								<Image
									key={index}
									src={image}
									alt={data.title ?? ""}
									className="w-full h-auto rounded cursor-pointer"
									width={500}
									height={500}
									onClick={() => {
										console.log("image", image);
										setCurrentImage(image);
									}}
								/>
							))}
						</div>
					)}
				</div>
				<p className="text-gray-700">{data?.objectDate}</p>
				<p className="text-gray-500">
					{data.artistWikidataURL || data.artistULAN_URL ? (
						<Link
							target="_blank"
							href={data.artistWikidataURL! ?? data.artistULAN_URL ?? ""}
						>
							{data.artistDisplayName}
						</Link>
					) : (
						<>{data.artistDisplayName}</>
					)}
				</p>
				<p className="mt-2">{data?.medium}</p>
			</div>
		</div>
	);
};

export default function Home() {
	const dispatch = useAppDispatch();
	const { data, error, loading, status } = useAppSelector(
		(state) => state.objects
	);

	useEffect(() => {
		// Fetch objects when the component mounts or when the status is IDLE
		if (status.includes(Status.IDLE) && !loading && data.list?.length === 0) {
			dispatch(fetchObjectsAsync());
		}
	}, []);
	
	const onPageChange = (page: number) => {
		if (data.metaData.currentPage === page) return;
		dispatch(setPageNumber(page));
		dispatch(fetchObjectByIdAsync(page.toString()));
	};

	if (error) return <ErrorMessage message={error.message} />;
	if (loading) return <div>Loading...</div>;
	if (data.list && data.list.length > 0) {
		return (
			<>
				<div className="grid gap-8 grid-cols-1 mt-4">
					<SelectedObject />
				</div>
				<div className="flex items-center justify-center">
					{metadata && (
						<AppPagination
							metaData={data.metaData!}
							onPageChange={(page: number) => onPageChange(page)}
						/>
					)}
				</div>
			</>
		);
	}
}
