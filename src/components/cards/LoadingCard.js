import React, { useMemo } from 'react';
import { Card, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';

const LoadingCard = ({ count = 4, size = 'col-md-3' }) =>
	useMemo(
		() =>
			Array(count)
				.fill()
				.map((e, i) => (
					<div key={i} className={`${size} mb-3`}>
						<Skeleton loading={true} active>
							<Card>
								<Meta title={'none'} description={'none'} />
							</Card>
						</Skeleton>
					</div>
				)),
		[count]
	);

export default LoadingCard;
