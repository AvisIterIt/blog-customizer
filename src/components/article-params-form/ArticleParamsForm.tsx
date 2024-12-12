import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from '../../ui/select/Select';
import clsx from 'clsx';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { CSSProperties } from 'react';
import {
	fontSizeOptions,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { Separator } from '../../ui/separator/Separator';
import { Text } from '../../ui/text/Text';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	onApply,
}: {
	onApply: (styles: CSSProperties) => void;
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const handleToggle = () => {
		setIsMenuOpen((previousState) => !previousState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isMenuOpen
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const [selectedFontFamily, setSelectedFontFamily] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedColorFont, setSelectedColorFont] = useState(fontColors[0]);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [selectedWidthContact, setSelectedWidthContact] = useState(
		contentWidthArr[0]
	);

	const handleReset = () => {
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedColorFont(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedWidthContact(defaultArticleState.contentWidth);

		onApply({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
		} as CSSProperties);
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		const styles = {
			'--font-family': selectedFontFamily.value,
			'--font-size': selectedFontSize.value,
			'--font-color': selectedColorFont.value,
			'--bg-color': selectedBackgroundColor.value,
			'--container-width': selectedWidthContact.value,
		} as React.CSSProperties;
		onApply(styles);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleApply}>
					<div className={styles.optionsContainer}>
						<Text
							as={'h2'}
							size={31}
							weight={800}
							children='Задайте параметры'
						/>
						<Select
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							onChange={(opt) => setSelectedFontFamily(opt)}
							title='шрифт'
						/>
						<RadioGroup
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={(opt) => setSelectedFontSize(opt)}
							name='fontSize'
							title='Размер шрифта'
						/>
						<Select
							selected={selectedColorFont}
							options={fontColors}
							onChange={(opt) => setSelectedColorFont(opt)}
							title='цвет шрифта'
						/>
						<Separator />
						<Select
							selected={selectedBackgroundColor}
							options={backgroundColors}
							onChange={(opt) => setSelectedBackgroundColor(opt)}
							title='цвет фона'
						/>
						<Select
							selected={selectedWidthContact}
							options={contentWidthArr}
							onChange={(opt) => setSelectedWidthContact(opt)}
							title='ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
