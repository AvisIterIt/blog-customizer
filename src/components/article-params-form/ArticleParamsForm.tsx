import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from '../../ui/select/Select';
import clsx from 'clsx';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { CustomCSSProperties } from '../../index';
import {
	fontSizeOptions,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { Separator } from '../../ui/separator/Separator';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	onApply,
}: {
	onApply: (styles: CustomCSSProperties) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const handleToggle = () => {
		setIsOpen((previousState) => !previousState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isOpen
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const handleFontFamilyChange = (option: OptionType) => {
		setSelectedFontFamily(option);
	};

	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const handleFontSizeChange = (option: OptionType) => {
		setSelectedFontSize(option);
	};

	const [selectedColorFont, setSelectedColorFont] = useState(
		defaultArticleState.fontColor
	);
	const handleColorFontChange = (option: OptionType) => {
		setSelectedColorFont(option);
	};

	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const handleBackgroundColorChange = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};

	const [selectedWidthContact, setSelectedWidthContact] = useState(
		defaultArticleState.contentWidth
	);
	const handleWidthContactChange = (option: OptionType) => {
		setSelectedWidthContact(option);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const appliedStyles: CustomCSSProperties = {
			'--font-family': selectedFontFamily.value,
			'--font-size': selectedFontSize.value,
			'--font-color': selectedColorFont.value,
			'--bg-color': selectedBackgroundColor.value,
			'--container-width': selectedWidthContact.value,
		};

		onApply(appliedStyles);
	};

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
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.optionsContainer}>
						<h2 className={styles.optionsTitle}>Задайте параметры</h2>
						<Select
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							title='шрифт'
						/>
						<RadioGroup
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={handleFontSizeChange}
							name='fontSize'
							title='Размер шрифта'
						/>
						<Select
							selected={selectedColorFont}
							options={fontColors}
							onChange={handleColorFontChange}
							title='цвет шрифта'
						/>
						<Separator />
						<Select
							selected={selectedBackgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							title='цвет фона'
						/>
						<Select
							selected={selectedWidthContact}
							options={contentWidthArr}
							onChange={handleWidthContactChange}
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
