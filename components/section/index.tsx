import {Component, Prop, VNode, VueComponent} from '@fe/types'
import {Head} from '@fe/ui-kit'

import '~/components/section/index.css'
import arrowIcon from '~/static/section/arrow.svg'
import Card, { ICardProps } from '~/components/card'

interface ISectionProps {
	heading: string
    cards: ICardProps[]
}

@Component
export default class Section extends VueComponent<ISectionProps> {

    @Prop()
    readonly heading!: ISectionProps['heading']

    @Prop()
    cards!: ISectionProps['cards']

    private isOpenedSection = false

    private toggleOpenedSection(): void {
        this.isOpenedSection = !this.isOpenedSection
    }

    private get arrowAnimateClasses(): string {
        return this.isOpenedSection
            ? 'sectionArrowIcon'
            : 'sectionArrowIcon sectionArrowIconOpened'
    }

    private get boxAnimateClasses(): string {
        return this.isOpenedSection
            ? 'sectionBox sectionBoxOpened'
            : 'sectionBox'
    }

    private render(): VNode {
        return (
            <section class="section">
                <div class="sectionHead">
                    <div class="sectionHeading" onclick={this.toggleOpenedSection}>
                        <Head size={'XXL'}>{this.heading}</Head>
                        <Head class="sectionCount" size={'XL'}>{this.cards.length}</Head>
                        <img
                            class={this.arrowAnimateClasses}
                            src={arrowIcon}
                            alt="arrow-icon"
                        />
                    </div>
                </div>

                <div class={this.boxAnimateClasses}>
                    <transition name="fade" mode="out-in">
                        {this.isOpenedSection && (
                            <div class="sectionContainer">
                                {this
                                    .cards
                                    .map((card) => (
                                        <Card
                                            key={card.heading}
                                            heading={card.heading}
											path={card.path}
                                        />
                                    ))}
                            </div>
                        )}
                    </transition>
                </div>
            </section>
        )
    }
}

