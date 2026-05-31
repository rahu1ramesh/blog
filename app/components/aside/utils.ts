import type { AsideItems } from "./models";

export const updateCurrentStatus = (items: AsideItems[], pathName: string) => {
    const targetId = pathName.startsWith("/writing") ? "writing" : "about";

    return items.map((item) => {
        return {
        ...item,
        isCurrent: item.id === targetId, 
        };
    });
}